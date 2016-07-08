using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calender.Models.modules.contacts
{
	public class Contacts
	{
		private Entities _db = new Entities();

		public JObject GetContact(JObject json)
		{
			dynamic ob = json;
			int userid = ob.userid;

			var user = from u in _db.user
						join up in _db.userprofile on u.iduser equals up.userid
						where u.iduser == userid
						select new
						{
							id = u.iduser,
							u.email,
							name = u.firstname + " " + u.lastname,
							up.address1,
							up.homephone,
							up.gender,
							up.country,
							up.state,
							up.city
						};
			return JObject.FromObject(user.FirstOrDefault());
		}

		public JObject GetContacts(JObject json)
		{
			dynamic ob = json;
			int orgid = ob.user.orgid;

			var users = from u in _db.user
						join up in _db.userprofile on u.iduser equals up.userid
						where u.org_id == orgid
						select new { id = u.iduser, u.email, name=u.firstname + " " + u.lastname,
							up.address1, up.homephone, up.gender, up.country, up.state, up.city };
			var list = users.ToList();
			return JObject.FromObject(new { contacts = list });
		}

		public JObject NewContact(JObject json)
		{
			JObject err = null;
			using (var dbContextTransaction = _db.Database.BeginTransaction())
			{
				try
				{

					dynamic ob = json;
					string email = ob.email;
					var usertmp = _db.user.FirstOrDefault(o => o.email == email);
					if (usertmp != null)
					{
						err = JObject.FromObject(new { type = 1, info = "the email is already used" });
						return err;
					}
					User user = new Models.User()
					{
						firstname = ob.firstname,
						lastname = ob.lastname,
						username = ob.firstname,
						email = ob.email,
						password = "",
						org_id = ob.user.orgid,
						createdby = ob.user.userid
					};

					_db.user.Add(user);
					_db.SaveChanges();
					Userprofile up = new Models.Userprofile()
					{
						userid = user.iduser,
						address1 = ob.address1,
						address2 = ob.address2,
						city = ob.city,
						state = ob.state,
						country = "US",
						zipcode = ob.zipcode,
						gender = ob.gender.ToString()[0].ToString(),
						dob = ob.dob,
						homephone = ob.homephone
					};
					_db.userprofile.Add(up);
					_db.SaveChanges();

					//dbContextTransaction.Rollback();

					//Console.WriteLine("record inserted as ID : {0}", user.iduser);
					dbContextTransaction.Commit();
				}
				catch (Exception e)
				{
					dbContextTransaction.Rollback();
					err = JObject.FromObject(new { type = 1, info = e.Message });
				}

				return err;
			}
		}
	}
}