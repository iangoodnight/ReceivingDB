# ReceivingDB

Keeping a detailed, accurate receiving log is essential to reliable inventory
management and effective resource planning.  It is vital that receiving log
entries be detailed, searchable, and protected from changes.  Utilizing MongoDB
on the back-end provides a scalable extensible database platform that has the
ability to grow as business needs change.  Completely server-side rendered,
mobile-friendly, and installable as a Progressive Web Application, pages load
fast, getting the data needed for day-to-day operations closest to the people
who own those processes.  ReceivingDB separates the ability to write (create
new) entries from the ability to audit (makes changes to) entries with no user
account required to search and browse the reciving log (though the entire web
interface can still be restricted by IP address).  Defining role-based access
in this manner saves on the overhead of creating and maintaining user accounts
for casual users, treats the log itself as a write-only interface, and still
allows for versioned changes if required.  These controls allow for ReceivingDB
to be a reliable, auditable, searchable cornerstone to a more comprehensive
open-source inventory management and resource planning implementation.
