namespace stockboi.RequestModels{
    public class PagingRequest {
        public int NumberOfItemsPerPage { get; set; }
        public int PageSelected { get; set; }
        public string SortBy { get; set; }
    }
}