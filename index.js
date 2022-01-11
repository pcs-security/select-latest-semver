const core   = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');;

try 
{
  const versionList = JSON.parse(core.getInput('list'));
  let semverList = versionList.map(version => semver.parse(version))
                              .filter(version => Boolean(version))
                              .sort(semver.rcompare);

  if (semverList.length > 0)
  {
    core.setOutput("latest", semverList[0].toString());
  }
  else if (Boolean(core.getInput('fail-on-empty')))
  {
    core.setFailed("No valid SemVer values can be selected from the list.");
  }
  else
  {
    core.setOutput("latest", "");
  }
}
catch (error)
{
  core.setFailed(error.message);
}