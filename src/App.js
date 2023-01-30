import './App.css';
import { useEffect } from 'react';

// problem
// 1. token
// 2. 사용법이 어려움
// 3. fetch가 잘 안됨 => 여기서 막힘

let { graphql } = require("@octokit/graphql");
graphql = graphql.defaults({
  headers: {
    authorization: `token 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`,
  },
});
async function getUser() {
  const { user } = await graphql(`
    {
      user(login: "jiyongnoh") {
        name
        createdAt
      }
    }
  `);
  return {user}
}


async function getRepository() {
  const { repository } = await graphql(`
    {
      repository(owner: "codestates-seb", name: "agora-states-fe") {
        discussions(first: 100) {
          edges{
            node{
              title
            }
          }
        }
      }
    }
  `);
  return {repository};
}

function App() {

  useEffect(()=>{
    return ()=>{
      getRepository()
      .then(data => {
        console.log(data)
      })
    }
  })

  return (
    <div className="App">
      
    </div>
  );
}

export default App;