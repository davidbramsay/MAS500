from bs4 import BeautifulSoup

class ElectionDataObject:

    def __init__(self, url):
        self.url = url
        self.importSiteData()

    def importSiteData(self):
        self.siteRaw = BeautifulSoup.urllib2.urlopen(self.url).read()

    def printSiteData(self):
        print BeautifulSoup(self.siteRaw).prettify()
