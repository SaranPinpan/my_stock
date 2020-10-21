using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Products  //  << this is not a table name
    {
        //Change long to int
        public int ProductId { get; set; }  //  << this is a column name 100%
        public string Name { get; set; }
        public string Image { get; set; }
        public int Stock { get; set; }
        public int Price { get; set; }
    }
}
