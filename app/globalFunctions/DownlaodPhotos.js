import RNFetchBlob from 'rn-fetch-blob';


// adresse de test 'https://reactnative.dev/img/tiny_logo.png';

export function downloadPhotos(adresseServer = "https://reactnative.dev/img", photos = ['tiny_logo.png']) {


    let adressDowload = adresseServer + '/' + photos[0];
    let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob
            .config({
                fileCache: true,
                addAndroidDownloads: {
                    // Related to the Android only
                    useDownloadManager: true,
                    notification: true,
                    path : dirs.PictureDir + '/' + photos[0],
                    // path : dirs.DocumentDir + '/image.png',
                    description: 'Image',
                },
                notification: true,
            })
            .fetch('GET', adressDowload, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path with file extension `png`
                console.log('Fichier sauvegardé vers: ', res.path())
                // Beware that when using a file path as Image source on Android,
                // you must prepend "file://"" before the file path
                // setChemin(res.path());
                // imageView = <Image source={{ uri: Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path() }} />
            })
            .catch((errorMessage, statusCode) => {
                console.log("Erreur fct downloadPhotos():");
                console.log(errorMessage);
            })
}