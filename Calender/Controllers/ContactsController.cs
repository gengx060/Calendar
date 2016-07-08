using Calender.Models;
using Calender.Models.modules.contacts;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Calender.Controllers
{
    public class ContactsController : ApiController
	{
		private Entities _db = new Entities();

		[HttpPost]
		public async Task<IHttpActionResult> GetContact([FromBody]JObject json)
		{
			JObject user = null;
			await Task.Run(() =>
			{
				Contacts c = new Contacts();
				user = c.GetContact(json);
			});
			return Ok(user);
		}

		[HttpPost]
		public async Task<IHttpActionResult> GetContacts([FromBody]JObject json)
		{
			JObject users = null;
			await Task.Run(() =>
			{
				Contacts c = new Contacts();
				users = c.GetContacts(json);
			});
			return Ok(users);
		}

		[HttpPost]
		public async Task<IHttpActionResult> NewContact([FromBody]JObject json)
		{
			JObject err = null;
			await Task.Run(() =>
			{
				Contacts c = new Contacts();
				err = c.NewContact(json);
			});

			if (err != null)
				return Content(HttpStatusCode.ExpectationFailed, err);
			return Ok();
		}
	}
}
