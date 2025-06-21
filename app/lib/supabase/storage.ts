import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadFile = async (
  file: File,
  bucket: string,
  path: string
): Promise<{ url: string; error: Error | null }> => {
  try {
    if (!file || !file.name) {
      throw new Error('No file or file name provided for upload.');
    }
    const fileExt = file.name.includes('.') ? file.name.split('.').pop() : '';
    const fileName = `${Math.random().toString(36).substring(2)}${fileExt ? '.' + fileExt : ''}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    const publicUrl = publicData?.publicUrl || '';

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { url: '', error: error as Error };
  }
};

export const deleteFile = async (
  bucket: string,
  path: string
): Promise<{ error: Error | null }> => {
  try {
    // For deletion, we need to use the service role key which has admin privileges.
    // This should only be called from server-side code.
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Supabase delete error:', error.message);
      throw error;
    }
    
    console.log('Successfully deleted file:', path, 'from bucket:', bucket, 'Data:', data);
    return { error: null };
  } catch (error) {
    console.error('Error in deleteFile function:', error);
    return { error: error as Error };
  }
};

export const getPublicUrl = (bucket: string, path: string): string => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  return publicUrl;
}; 