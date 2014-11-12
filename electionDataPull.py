from bs4 import BeautifulSoup
import urllib2
import csv

class ElectionDataObject:

    def __init__(self, url):
        self.url = url
        self.importSiteData()


    def importSiteData(self):
        self.siteRaw = BeautifulSoup(urllib2.urlopen(self.url).read())


    def printSiteData(self):
        print self.siteRaw.prettify()


    def parseTable(self):

        def onlyascii(char):
            if ord(char) < 48 or ord(char) > 127: return ''
            else: return char

        def parseRow(rowString):

            rowVal = []
            for tag in rowString.find_all(['th','td']):
                tempString = ''
                for partString in tag.stripped_strings:
                    tempString = tempString + ' ' + filter(onlyascii, partString)
                rowVal.append(tempString)
            return rowVal

        tableData = []

        for tag in self.siteRaw.table.table.find_all('tr'):
            tableData.append(parseRow(tag))

        self.tableData = tableData


    def printFullTable(self):
        for row in self.tableData:
            for str in row:
                print str + '\t',
            print '\n',


    def printStateResults(self,state):
        for str in self.tableData[0]:
            print str + '\t',
        print '\n',

        for row in self.tableData[1:]:
            if state in row[0]:
                for str in row:
                    print str + '\t',


    def exportCSVFile(self,filePath='electionOutput.csv'):

        with open(filePath,'w') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerows(self.tableData)



if __name__ == "__main__":

    print 'Examples:\n'

    ElectionResults2012 = ElectionDataObject('http://www.archives.gov/federal-register/electoral-college/2012/popular-vote.html')
    print '...object created successfully and html grabbed'

    ElectionResults2012.parseTable()
    print '...table parsed successfully from html using beautiful soup\n'

    ElectionResults2012.printStateResults("VA")
    print '\n\n...results from VA printed above'

    ElectionResults2012.exportCSVFile()
    print '...CSV exported to default filename (electionOutput.csv)'

    print '\nother options include printing raw site data, the entire table, and state '