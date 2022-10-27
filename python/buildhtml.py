
fichier = open("aidehtml.txt", "a")

for j in range(41):
    if (j != 0):
        fichier.write(f'\n        <div class="row" id="row_{j}">')
        for i in range(41):
            if (i != 0 and j != 0):
                fichier.write(
                    f'\n            <div class="row_case_inactive" id="r{j}_c{i}"></div>')
        fichier.write('\n        </div>')

fichier.close()
