using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Users //  << this is not a table name
    {
        public int Id { get; set; }  // change long to int
        public string Username { get; set; }
        public string Password { get; set; }
        public string Position { get; set; }
    }
}
