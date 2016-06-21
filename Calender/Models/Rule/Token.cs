using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace Calender.Models.Rule
{
	public class Token
	{
		private Entities _db = new Entities();

		public string GenerateTokenWithId(int userId)
		{
			var cookie = string.Empty;
			var form = string.Empty;
			AntiForgery.GetTokens(null, out cookie, out form);
			Userlogin login = new Userlogin()
			{
				userid = userId,
				cookie = cookie,
				form = form,
				create_time = DateTime.Now
			};
			_db.userlogin.Add(login);
			_db.TrySaveChanges();

			return cookie + ':' + form + ':' + userId;
		}

		public bool validate(string token)
		{
			var cookie = string.Empty;
			var form = string.Empty;
			int userId = -1;
			var tokens = token.Split(':');
			if (tokens.Length == 3)
			{
				cookie = tokens[0].Trim();
				form = tokens[1].Trim();
				int.TryParse(tokens[2].Trim(), out userId);
			}
			//ret = _db.userlogin.Max(i => i.create_time); Any(o => o.cookie == cookie && o.form == form);
			var userlogin = _db.userlogin.Where(o => o.userid == userId).OrderByDescending(y => y.create_time).FirstOrDefault();

			if (userlogin == null || (DateTime.Now - userlogin.create_time).Value.Minutes > 2)
			{
				return false;
			}

			return userlogin.form == form && userlogin.cookie == cookie;
		}
	}
}