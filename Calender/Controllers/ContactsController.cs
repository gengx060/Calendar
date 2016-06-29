using Calender.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Calender.Controllers
{
    public class ContactsController : ApiController
	{
		private Entities _db = new Entities();

		[HttpPost]
		public IHttpActionResult GetContacts([FromBody]JObject json)
		{
			//Session["test"] = "";
			var user = _db.user.Where(o => o.org_id == 2);
			return Ok(user.ToList<User>());
		}
	}
}
