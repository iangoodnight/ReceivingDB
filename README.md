# ReceivingDB

![ReceivingDB Banner](/assets/banner.png)

Keeping a detailed, accurate receiving log is essential to reliable inventory
management and effective resource planning.  It is vital that receiving log
entries be detailed, searchable, and protected from changes.  Utilizing MongoDB
on the back-end provides a scalable extensible database platform that can grow
as business needs change.  Completely server-side rendered, mobile-friendly,
and installable as a Progressive Web Application, pages load fast, getting the
data needed for day-to-day operations closest to the people who own those
processes.  ReceivingDB separates the ability to write (create new) entries
from the ability to audit (makes changes to) entries with no user account
required to search and browse the receiving log (though the entire web
interface can still be restricted by IP address).  Defining role-based access
in this manner saves on the overhead of creating and maintaining user accounts
for casual users, treats the log itself as a write-only interface, and still
allows for versioned changes if required.  These controls allow for ReceivingDB
to be a reliable, auditable, searchable cornerstone to a more comprehensive
open-source inventory management and resource planning implementation.

## Installation and getting started

To get ReceivingDB up and running, you will need:

1.) A MongoDB instance
2.) A locally or cloud-hosted installation of ReceivingDB

### Setting up MongoDB

ReceivingDB requires a MongoDB connection string as an environment variable to
set up database services.  A self-hosted MongoDB instance is an option, but for
the quickest, most straightforward setup, create a [MongoDB Atlas account] and
set up a cluster there.

![Sign up for Atlas](/assets/mongo_atlas.png)

From "Security" > "Database Access," choose to "add new database user."
ReceivingDB will use this database user account for connecting to your MongoDB
cluster, so be sure to select a secure password.

![Create a database user](/assets/dbuser.png)

Once you've instantiated your first cluster, click on "Connect" and choose to
"Connect your application."

![Connect your application](/assets/connect_atlas.png)

The connection string returned to you will look something like this:

```
mongodb+srv://<username>:<password>@testing.edbyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

Replace `<username>` and `<password>` with the username and password you've
assigned to your new database user, and replace `myFirstDatabase` with the name
you would like used for the ReceivingDB collection ("receiving" would be a good
choice).  Keep this connection string handy, as you will need it momentarily.

### Install on Heroku

Use the one-click deploy button below to deploy your instance of ReceivingDB.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

You will be redirected to Heroku, where you will be asked to either sign in or
create a free account.  Once authenticated, you will be prompted to name your
app and provide the required environment variables.

![Name your app](/assets/deploy.png)

#### Environmental Variables

| Var | Required | Description |
| --- | -------- | ----------- |
| `COOKIE_SECRET` | ✓ | A secret key to sign secure cookies |
| `IP_WHITELIST` | ✗ | A semicolon-separated list of allowed IPs |
| `MONGODB_URI` | ✓ | A MongoDB connection string |

Make sure to choose a long string for your `COOKIE_SECRET`.  This secret will be
used to sign your secure cookies and to keep your sessions private. The
`IP_WHITELIST` will optionally limit access to ReceivingDB to specific IP
addresses (ie: 171.216.30.2;171.216.30.3;171.216.30.4) and the `MONGODB_URI`
is the MongoDB connection string we set up previously.

#### Check your installation

You will see the build log reporting on the progress of your install.  Once the
build process finishes, click "Manage app" and then "Open app," and you should
find yourself on the landing page of ReceivingDB.

![Landing page](/assets/landing.png)

### Or, install locally

If you prefer to install it locally, you can fork this repo, pull down the files
from GitHub, and install the dependencies with `npm install`.  You will need the
same environment variables as described above, saved in the application's root
as `.env`.

### Getting started

ReceivingDB comes with a default admin account on installation.

| username | password |
| -------- | -------- |
| `admin` | `123admin456!` |

On your first login as the default admin, you are required to change the
password.  A best practice is to use this account to create your own named admin
accounts and then disable it. You need at least one account with the `WRITE`
role in able to be able to add data to ReceivingDB.  The `AUDIT` role is
required to make changes to entries after they have been entered.  Only the
`ADMIN` role can create and disable user accounts.

## Further Documentation

Check the ![user guide](https://iangoodnight.github.io/ReceivingDB/) for
detailed documentation and updates.


:sunglasses: Icons made by Freepik from www.flaticon.com

[MongoDB Atlas account]: https://account.mongodb.com/account/register
