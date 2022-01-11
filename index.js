const core   = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');;

try 
{
  const versionList = JSON.parse(core.getInput('list'));
  const isStrictParsing = JSON.parse(core.getInput('strict-parsing').toLowerCase());
  const isStrictOutput = JSON.parse(core.getInput('strict-output').toLowerCase());

  let semverMap = new Map();
  
  versionList.forEach(version => {
    let sv = semver.parse(version, !isStrictParsing);
    if (sv != null) semverMap.set(sv, version);
  });

  let semverList = Array.from(semverMap.keys).sort(semver.rcompare);                              

  if (semverList.length > 0)
  {
    let latest = semverList[0];
    core.setOutput("latest", isStrictOutput ? latest.toString() : semverMap[latest]);
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