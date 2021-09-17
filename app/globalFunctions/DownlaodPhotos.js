import RNFetchBlob from 'rn-fetch-blob';


// adresse de test 'https://reactnative.dev/img/tiny_logo.png';

// export function downloadPhotos(adresseServer = "https://reactnative.dev/img", photos = 'tiny_logo.png') {
export function downloadPhotos(adresseServer = "http://192.168.1.13:8000/uploads/photos", photo = 'machine-production-4-6140c2e9c9322750663675.jpg') {
    

    let adressDowload = adresseServer + '/uploads/photos/' + photo;
    let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob
            .config({
                fileCache: true,
                addAndroidDownloads: {
                    // Related to the Android only
                    useDownloadManager: true,
                    notification: true,
                    path : dirs.PictureDir + '/' + photo,
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