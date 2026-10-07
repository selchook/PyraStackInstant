using UnityEditor;

// Imports the rank avatar and UI icon PNGs as sprites so they can be dropped straight into an Image.
public class RankAvatarImporter : AssetPostprocessor
{
    static readonly string[] Folders = { "Assets/Art/RankAvatars/", "Assets/Art/Icons/" };

    void OnPreprocessTexture()
    {
        if (System.Array.FindIndex(Folders, f => assetPath.StartsWith(f)) < 0)
            return;

        var importer = (TextureImporter)assetImporter;
        importer.textureType = TextureImporterType.Sprite;
        importer.spriteImportMode = SpriteImportMode.Single;
        importer.alphaIsTransparency = true;
        importer.mipmapEnabled = false;
        importer.maxTextureSize = 512;
    }
}
