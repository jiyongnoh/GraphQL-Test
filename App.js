import './App.css';
import { useEffect } from 'react';

// problem
// 1. token
// 2. 사용법이 어려움
// 3. fetch가 잘 안됨

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
        discussions(first: 10) {
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

const { repository } = await graphql(`
    {
      repository(owner: "codestates-seb", name: "agora-states-fe") {
        discussions(first: 10) {
          edges{
            node{
              title
            }
          }
        }
      }
    }
  `);

function App() {

  // useEffect(()=>{
  //   return ()=>{
  //     getRepository()
  //     .then(data => {
  //       console.log(data)
  //     })
  //   }
  // })

  console.log(repository)
  
  return (
    <div className="App">
      {repository.discussions.edges.map((el) => el.node.title)}
    </div>
  );
}

export default App;