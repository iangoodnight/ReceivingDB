# User guide

Everything you need to know to successfully navigate ReceivingDB, from search
and browsing to auditing and administrating user accounts, users can find the
answer here.

## Browsing and searching

ReceivingDB offers several ways to browse and search receiving log entries.  No
user account is required to search or browse ReceivingDB, though the web portal
itself may be restricted to an IP address or set of IP addresses.  Opening
access to the search and browse function cuts down on user account management,
as being on the same domain is enough to allow casual users to find the
information they need.

### Browsing

To browse the receiving log from ReceivingDB, select "Browse" from the
navigation menu.

![Select 'browse' from the menu](/assets/menu_browse.png)

The resulting page will load the last seven days of receiving log entries, from
newest to oldest, for users to browse through.  Click on any row, and use the
arrow keys or the tab key to navigate.  Selecting "Next" will take users back a
week, continuously until there are no more entries to be found.

![Use arrow keys to navigate](/assets/browse.png)

Double-clicking on any row or pressing the enter key with a row selected will
take users to the entry details page.  From here, users can see items that were
shipped together as part of the same purchase order.

![View entry details](/assets/view.png)

Some data points are not visible at specific breakpoints on mobile devices.
Viewing the entry details allows users to see data that might not be visible
from the browse page on mobile devices.

### Searching

ReceivingDB allows users to search by a custom date range, instead of looking
at the last seven days at a time, by purchase order, part number over a date
range, and vendor over a date range.

#### By date range

Entering in a custom date range lets users browse through any period.  For
example,  to see all the receiving log entries from May of 2021, search by the
date range `05/01/2021` through `05/31/2021`.  The result will bring users back
to the browse page, displaying all entries from May 2021 instead of the default,
the last seven days.

![Search by date](/assets/date-range.png)

#### By purchase order

It might be the case that a purchase order comes in over several days, in
multiple shipments.  Searching by purchase order retrieves these disparate
entries and displays them all from the entry details page.  This combined entry
details page allows users to check and see if their purchase order has been
received in its entirety and as expected.

![Search by purchase order](/assets/purchase-order.png)

#### By part number

Search by part number to track orders with a specific part number. For example,
entering a part number and a date range brings the user back to the browse page
filtered down to just entries that include the part number in question.  Users
can adjust the date range to a custom period or leave it at the default, the
last six months.

![Search by part number](/assets/part-number.png)

#### By vendor

Searching by vendor returns the user to the browse page, filtered down to
entries that match the search query.  By default, searches by vendor return
matches from the last two months.  Users can enter a date range to search over a
custom period.

![Search by vendor](/assets/vendor.png)

## Creating new entries

Unlike browsing or searching, users must be logged in to a registered account
with the "WRITE" permission to add entries to the receiving log.  Only users
with the "WRITE" role will have access to the new entry form.

![Create new entries](/assets/new.png)

All top-level fields, date, time, vendor, purchase order, carrier, intended for,
are required.

![Top-level fields are required](assets/top-level.png)

All item details 
