cat report.txt | if grep -Fq 'Low'; \ # https://en.wikibooks.org/wiki/Grep
       then echo 'Failed vulnerability check' && exit 1; else echo 'Passed vulnerability check' && exit 0; fi