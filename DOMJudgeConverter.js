const DOMJUDGE_URL = 'https://senior.schematics-npc.com'
const CONTEST_API_URI = '/api/v4/contests'
const CONTEST_ID = '5' // Penyisihan
const JUDGEMENTS = `/judgements.json`

async function getJSONFromAPI(url) {
  const response = await fetch(url)
  return await response.json()
}

async function getProblemIndexes() {
  const problems = await getJSONFromAPI(
    `${DOMJUDGE_URL}${CONTEST_API_URI}/${CONTEST_ID}/problems`
  )
  const problem_indexes = {}
  problems.forEach((problem) => {
    problem_indexes[problem.id] = problem.ordinal + 1
  })
  return problem_indexes
}

async function getSubmissions() {
  const submissions = await getJSONFromAPI(
    `${DOMJUDGE_URL}${CONTEST_API_URI}/${CONTEST_ID}/submissions`
  )
  const submissionsObj = {}
  submissions.forEach((submission) => {
    submissionsObj[submission.id] = submission
  })
  return submissionsObj
}

async function getSolutions() {
  let { start_time } = await getJSONFromAPI(
    `${DOMJUDGE_URL}${CONTEST_API_URI}/${CONTEST_ID}`
  )
  start_time = new Date(start_time)
  const problem_indexes = await getProblemIndexes()
  const judgements = await getJSONFromAPI(JUDGEMENTS)
  const solutions = {}
  const submissions = await getSubmissions()

  judgements.forEach((judgement) => {
    const submission = submissions[judgement.submission_id]
    if (submission) {
      const submissionDate = new Date(submission.time)
      if (submission)
        solutions[judgement.submission_id] = {
          user_id: submission.team_id,
          problem_index: problem_indexes[submission.problem_id],
          verdict: judgement.judgement_type_id == 'AC' ? 'AC' : 'WA',
          submitted_seconds: Math.trunc(
            (submissionDate.getTime() - start_time.getTime()) / 1000
          ),
        }
    }
  })
  return solutions
}

async function getUser() {
  const users = await getJSONFromAPI(
    `${DOMJUDGE_URL}${CONTEST_API_URI}/${CONTEST_ID}/teams`
  )
  const userObj = {}
  users.forEach((user) => {
    userObj[user.id] = {
      name: user.name,
      college: user.affiliation,
      is_exclude: false,
      logo: `${DOMJUDGE_URL}/images/affiliations/${user.organization_id}.png`,
    }
  })
  return userObj
}

;(async function getDataFromDOMJudge() {
  const solutions = await getSolutions()
  const users = await getUser()
  const resolverContestObj = {
    problem_count: (
      await getJSONFromAPI(
        `${DOMJUDGE_URL}${CONTEST_API_URI}/${CONTEST_ID}/problems`
      )
    ).length,
    solutions,
    users,
  }
  console.log(resolverContestObj)
  document.getElementById('body').innerText = JSON.stringify(resolverContestObj)
})()
