# Generated by Buildr 1.5.0, change to your liking


# Version number for this release
VERSION_NUMBER = "1.0.0"
# Group identifier for your projects
GROUP = "tilde-react-redux"
COPYRIGHT = ""

# Specify Maven 2.0 remote repositories here, like this:
repositories.remote << "http://repo1.maven.org/maven2"

desc "The Tilde-react-redux project"
define "tilde-react-redux" do

  project.version = VERSION_NUMBER
  project.group = GROUP
  manifest["Implementation-Vendor"] = COPYRIGHT
end