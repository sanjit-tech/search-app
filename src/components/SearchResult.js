import React, {Component, Fragment} from "react";
import './../App.css';
import axios from 'axios'
import HTMLRenderer from 'react-html-renderer'

class SearchResult extends Component{
    constructor(props){
        super(props)
        const { history } = this.props
        const { location } = history
        const { post_id } = location.state || {}
        console.log('post_id', post_id)
        this.state = {
            loading: false,
            searched_data: {},
            post_comment: [],
            post_id
        }

    }
    componentDidMount() {
        const {post_id} = this.state
        if(post_id){
            this.getSearchDataResult()
        }
    }

    getSearchDataResult =()=> {
        const {post_id} = this.state
        this.setState({ loading: true })
        let url = `${`http://hn.algolia.com/api/v1/items/${post_id}`}`
        axios.get(url)
            .then((response)=>{
                const {data} = response
                const {children} = data
                this.setState({searched_data: data, post_comment: children, loading: false })
            })
            .catch(errors => console.log('Not found'))
    }

    render(){
        const {searched_data, post_comment, loading} = this.state
        const {title, points, type} = searched_data || {}
        console.log('post_comment', post_comment)
        return(
            <div className="container p-5">
                <div className="row">
                    <div className="col-xl-12">
                        {loading &&
                        <div className="d-flex justify-content-center form-box">
                            <div className="spinner-grow text-danger" role="status" style={{width:'60px', height:'60px'}}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        }

                        {post_comment.length > 0 ?
                            <Fragment>
                                <h2 className="text-center mb-5">Search Result</h2>
                                <div className="shadow p-3 mb-5 bg-body rounded">
                                    <h3 className="mb-3">{title} <span className="badge bg-success" style={{fontSize:'16px'}}>{points}</span></h3>
                                    <ul className="list-group">
                                {post_comment.map((postData, i)=>{
                                    const {text, points, type, author} = postData
                                    return(

                                            <li className="list-group-item" key={i} style={{borderBottom:'1px solid #eee'}}>
                                                {points !== null && <span className="badge bg-primary">Point:-{points}</span>}
                                                {text !== null &&
                                                <HTMLRenderer
                                                    html={text}
                                                    // html={JSON.stringify(text).replace(/[^\w\s]/gi, '')}
                                                />
                                                }

                                                {author && <p className="text-info"><span style={{color:'gray'}}>Author:-</span> {author}</p>}
                                            </li>
                                    )
                                })}
                                    </ul>
                                </div>
                            </Fragment>
                            :
                            <h5 className="text-center mp-5">No Comment</h5>
                        }

                    </div>
                </div>
            </div>
        )
    }
}
export default SearchResult
