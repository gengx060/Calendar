using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
	class Program
	{
		static void Main(string[] args)
		{
			string _salt = "qazwsxertyuioplkjhgfvcdderwqasxderfgtrhjllkkldoeugjcvgjwigkdKDFGJGKFLkdievjk";
			string str = "password";

			var enc = new UnicodeEncoding();
			byte[] buffer = enc.GetBytes(_salt + (str ?? ""));

			SHA1CryptoServiceProvider cryptoTransformSHA1 =
						   new SHA1CryptoServiceProvider();
			string hash = BitConverter.ToString(
						   cryptoTransformSHA1.ComputeHash(buffer)).Replace("-", "");
			Console.WriteLine(hash);

			Console.ReadLine();
		}
	}
}
