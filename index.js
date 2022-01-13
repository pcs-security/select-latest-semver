const core   = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');

try 
{
  const versionList = JSON.parse(core.getInput('list'));
  const doCoercion = core.getBooleanInput('coercion');
  const isStrictParsing = core.getBooleanInput('strict-parsing');
  const isStrictOutput = core.getBooleanInput('strict-output');
  const isFailOnEmpty = core.getBooleanInput('fail-on-empty');

  let semverMap = new Map();

  console.log('String coercion is %s.', doCoercion ? 'on' : 'off');
  console.log('Strict parsing is %s.', isStrictParsing ? 'on' : 'off');
  console.log('Strict output is %s.', isStrictOutput ? 'on' : 'off');
  console.log('When no valid elements are found, this action will %s.', isFailOnEmpty ? 'fail' : 'return an empty string');
  console.log('Processing %d elements from list', versionList.length);
  
  const semverOpts = { loose: !isStrictParsing };

  versionList.forEach(version => {
    let sv = semver.parse(doCoercion ? semver.coerce(version, semverOpts) : version, semverOpts);
    if (sv != null) semverMap.set(sv, version);
  });

  console.log('Found %d valid SemVer values', semverMap.size);

  let semverList = Array.from(semverMap.keys()).sort(semver.rcompare);

  if (semverList.length > 0)
  {
    let latest = semverList[0];
    console.log('Selected value %s (Original: %s)', latest, semverMap.get(latest));
    
    core.setOutput("latest", isStrictOutput ? latest.toString() : semverMap.get(latest));
  }
  else if (Boolean())
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