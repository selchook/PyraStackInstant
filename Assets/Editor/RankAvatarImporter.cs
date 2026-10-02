using UnityEditor;

// Imports the rank avatar PNGs as UI sprites so they can be dropped straight into an Image.
public class RankAvatarImporter : AssetPostprocessor
{
    const string Folder = "Assets/Art/RankAvatars/";

    void OnPreprocessTexture()
    {
        if (!assetPath.StartsWith(Folder))
            return;

        var importer = (TextureImporter)assetImporter;
        importer.textureType = TextureImporterType.Sprite;
        importer.spriteImportMode = SpriteImportMode.Single;
        importer.alphaIsTransparency = true;
        importer.mipmapEnabled = false;
        importer.maxTextureSize = 512;
    }
}
