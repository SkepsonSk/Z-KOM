public with sharing class FM_GenresController {

    @AuraEnabled
    public static List<FM_Wrappers.Genre> getGenres(String mediaType) {
        return FM_MoviesDataSource.getGenres(mediaType);
    }

}