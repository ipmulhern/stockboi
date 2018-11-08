using System.Collections.Generic;

namespace stockboi.RequestModels{
    public class PagingResponse<T> {
        public int NumberOfPages { get; set; }
        public List<T> Data { get; set; }
    }
}