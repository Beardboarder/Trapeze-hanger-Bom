Matts Super Duper Electrical Trapeze Hanger Calculator 1600
A simple web-based calculator for creating a bill of material for electrical trapeze hanger hardware.
This calculator is intended for trapeze hangers suspended by threaded rod. It calculates the required 1/2" nuts, square washers, lock washers, window clamps, and Eaton B-Line B750-J12 beam clamps based on the hanger style and number of cable tray tiers entered.
Threaded rod is intentionally not included in this calculator.
---
What the Calculator Does
The calculator creates a combined hardware bill of material for one or more hanger types.
It supports:
Span-strut style trapeze hangers
Eaton B-Line B750-J12 beam-clamp style trapeze hangers
Single-tier hangers
Multi-tier hangers
Multiple hanger lines in one combined calculation
Waste / spare percentage
Package-size rounding
CSV export
---
Files in This Project
Place these files in the root of your GitHub Pages repository:
```text
index.html
styles.css
app.js
.nojekyll
README.md
```
File descriptions:
`index.html` - The main web page
`styles.css` - The page styling
`app.js` - The calculator logic
`.nojekyll` - Helps GitHub Pages serve the site cleanly
`README.md` - Instructions for the project
---
How to Open the Calculator
Option 1: Open Locally
Download or clone this repository.
Open the project folder.
Double-click `index.html`.
The calculator will open in your web browser.
No installation is required.
Option 2: Use GitHub Pages
Upload the files to your GitHub repository.
Go to the repository settings.
Open the Pages section.
Set the source to:
Branch: `main`
Folder: `/root`
Save the settings.
Open the GitHub Pages link after it finishes publishing.
The site URL will usually look like this:
```text
https://your-username.github.io/your-repository-name/
```
---
How to Use the Calculator
1. Add Hanger Lines
Each hanger type should be entered as its own line.
For example, if you have both span-strut hangers and beam-clamp hangers on the same job, enter them as separate lines.
Example:
Line	Quantity	Tiers	Top Support Style
1	10	1	Top spanner / span strut
2	6	2	Eaton B-Line B750-J12 beam clamp
The calculator will combine both lines into one final bill of material.
---
2. Choose a Preset
Use the Preset dropdown to quickly select common hanger types.
Included presets:
Single trapeze - top spanner strut
2-tier trapeze - top spanner strut
3-tier trapeze - top spanner strut
Single trapeze - B750-J12 beam clamps
2-tier trapeze - B750-J12 beam clamps
3-tier trapeze - B750-J12 beam clamps
Custom
Selecting a preset automatically fills in the hanger tier count and top support style.
---
3. Enter the Quantity
In the Qty field, enter how many hangers of that type are needed.
Example:
```text
Qty = 12
```
This means the calculator will count hardware for 12 hangers on that line.
---
4. Enter the Number of Tiers
In the Tiers field, enter how many cable tray levels are supported by each hanger.
Examples:
```text
1 tier = single trapeze
2 tiers = two-level trapeze
3 tiers = three-level trapeze
```
The tier count affects the number of nuts, square washers, and lock washers required.
---
5. Choose the Top Support Style
There are two top support styles:
Top Spanner / Span Strut
Use this when the threaded rods are suspended from a top span strut / spanner arrangement.
This style includes:
Top spanner hardware
2 window clamps per hanger
Eaton B-Line B750-J12 Beam Clamp
Use this when each threaded rod is suspended from an Eaton B-Line B750-J12 beam clamp.
This style includes:
2 Eaton B-Line B750-J12 beam clamps per hanger
2 nuts per beam clamp
2 lock washers per beam clamp
---
6. Add More Lines if Needed
Click Add hanger line to add another hanger type.
Use this when a job has mixed hanger types, such as:
10 single-tier span-strut hangers
4 two-tier span-strut hangers
8 single-tier B750-J12 beam-clamp hangers
Each line is calculated separately, then combined into one final BOM.
---
7. Enter Waste / Spare Factor
Use the Waste / spare factor (%) field to add extra material.
Example:
```text
10
```
This adds 10% to the raw hardware quantity before rounding.
If you do not want extra material, leave this set to:
```text
0
```
---
8. Choose Rounding
The calculator has two rounding options.
Round up to package size
This rounds the order quantity up to the package size entered.
Example:
```text
Raw quantity = 145
Package size = 100
Order quantity = 200
```
Round up to whole each only
This rounds only to the next whole number.
Example:
```text
Raw quantity = 145.5
Order quantity = 146
```
---
9. Set Package Sizes
Package sizes can be edited for each item.
Default package sizes:
Item	Default Package Size
1/2" hex nuts	100
1/2" square washers	100
1/2" lock washers	100
Window clamps	1
Eaton B-Line B750-J12 beam clamps	1
Change these values to match how your supplier packages the material.
---
10. Review the Bill of Material
The Bill of Material table shows:
Item
Size / part
Raw quantity
Order quantity
Unit
Package size
The Raw Qty is the calculated amount before package rounding.
The Order Qty is the amount to order after waste factor and rounding are applied.
---
11. Review the Line Breakdown
The line breakdown shows the hardware count for each hanger line before waste is added.
This is useful for checking that each hanger type was entered correctly.
---
12. Export to CSV
Click Export CSV to download a spreadsheet-friendly file.
The CSV export includes:
Combined bill of material
Line-by-line breakdown
You can open the CSV in Excel, Google Sheets, or other spreadsheet software.
---
Hardware Rules Used
General Rules
All nuts, square washers, and lock washers are 1/2".
Every hanger has 2 threaded rods.
Threaded rod is not included.
Quantities are calculated based on the number of hanger tiers and top support style.
---
Top Spanner / Span Strut Hardware
Per rod:
1 nut above
1 square washer above
1 square washer below
1 lock washer below
1 nut below
Per hanger:
2 rods
2 window clamps
---
Middle Tier Hardware
Per rod:
1 nut above
1 lock washer above
1 square washer above
1 square washer below
1 nut below
---
Bottom Hanger Hardware
Per rod:
1 nut above
1 lock washer above
1 square washer above
1 square washer below
1 nut below
---
Eaton B-Line B750-J12 Beam Clamp Hardware
Per hanger:
2 Eaton B-Line B750-J12 beam clamps
Per beam clamp:
2 1/2" nuts
2 1/2" lock washers
---
Example Calculation
Example input:
Line	Quantity	Tiers	Top Support Style
1	10	1	Top spanner / span strut
2	6	2	Eaton B-Line B750-J12 beam clamp
The calculator will:
Calculate the hardware for the 10 single-tier span-strut hangers.
Calculate the hardware for the 6 two-tier beam-clamp hangers.
Combine the totals into one BOM.
Apply the waste / spare factor.
Round the quantities based on the selected rounding mode.
Display the final order quantities.
---
Notes
This calculator is intended as a material takeoff aid. Always review the final quantities before ordering material.
Verify that the hanger design, hardware selection, and installation method are acceptable for the project requirements, drawings, specifications, and applicable codes.
