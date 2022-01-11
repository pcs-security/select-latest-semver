const core   = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');;

try 
{
  const versionList = JSON.parse(core.getInput('list'));
  const isStrictMode = JSON.parse(core.getInput('strict-mode').toLowerCase());
  const preserveInputs = JSON.parse(core.getInput('preserve-input').toLowerCase());

  let semverMap = new Map();
  
  versionList.forEach(version => {
    let sv = semver.parse(version, !isStrictMode);
    if (sv != null) semverMap.set(sv, version);
  });

  let semverList = Array.from(semverMap.keys).sort(semver.rcompare);                              

  if (semverList.length > 0)
  {
    let latest = semverList[0];
    core.setOutput("latest", preserveInputs ? semverMap[latest] : latest.toString());
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