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

		public string GenerateTokenWithId(int userId, string ip)
		{
			var cookie = string.Empty;
			var form = string.Empty;
			//AntiForgery.GetTokens(null, out cookie, out form);
			cookie = GGEncrypt.Encryption.GenerateToken();
			Userlogin login = new Userlogin()
			{
				userid = userId,
				cookie = cookie,
				//form = form,
				create_time = DateTime.Now,
				userIp = ip
			};
			_db.userlogin.Add(login);
			_db.SaveChanges();

			return cookie + ':' + form + ':' + userId;
		}

		public bool validate(string token, string ip)
		{
			if (token == null|| token == "null")
			{
				return false;
			}
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
			var userlogin = _db.userlogin.Where(o => o.userid == userId && o.userIp == ip)
				.OrderByDescending(y => y.create_time).FirstOrDefault();

			if (userlogin == null || (DateTime.Now - userlogin.create_time).Value.Hours > 2)
			{
				return false;
			}

			return ((userlogin.form==null && form=="") ||userlogin.form == form) && userlogin.cookie == cookie;
		}
	}
}