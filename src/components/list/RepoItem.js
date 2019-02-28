import React from 'react';
import { Route } from 'react-router-dom'

const RepoItem = ({id, name, description, language, stargazers_count}) =>
    <Route key={id} render={({ history}) => (
        <div className="repo_item" onClick={() => { history.push('/' + id) }}>
            <div className="head-container">
                <h1>{name}</h1>
            </div>

            {description ? <p>{description} </p> : null }

            <div className="misc">
                {/*Not proud of this. Ideally I would have downloaded the whole icon pack and fixed it properly*/}
                {language ? <p className='lang'>
                    <i title={language} className={
                        'solid devicon-' +
                        language.toLowerCase()
                            .replace('html', 'html5')
                            .replace('css','css3') + '-plain'}>&nbsp;</i></p> : null }

                <p className="fa fa-star">{stargazers_count}</p>
            </div>
        </div>
    )} />;

export default RepoItem