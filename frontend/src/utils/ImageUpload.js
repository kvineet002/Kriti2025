import supabase from "../config/supabase.js";

const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage.from("images").upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
    });

    if (error) {
        console.error("Upload error:", error.message);
        return;
    }

    const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(fileName);
    const uploadedUrl = publicUrlData.publicUrl;
    return uploadedUrl;
};


export default uploadImage;
