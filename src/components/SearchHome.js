import React, {Component, Fragment} from "react";
import './../App.css';
import axios from 'axios'
import $ from 'jquery'

class SearchHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            search_text: '',
            p_id: '',
            dataList: [],
            postList: []
        }

    }
    componentDidMount() {
        this.getPostDataResult()
    }

    handleChange = (e) => {
        const {p_id} = this.state
        const { value } = e.target
        if (e.key === 'Enter') {
            let url = `/search-result`
            this.props.history.push({
                pathname: `${url}/`,
                state: { post_id: p_id }
            })
        }
        if (value.length > 3) {
            this.setState({search_text: value}, ()=>{
                this.getSearchData({ search: value })
            })

        }
    };
    getPostDataResult =()=> {
        const {post_id} = this.state
        this.setState({ loading: true })
        let url = `${`https://jsonplaceholder.typicode.com/posts`}`
        axios.get(url)
            .then((response)=>{
                const {data} = response
                const {children} = data
                this.setState({postList: data, loading: false })
            })
            .catch(errors => console.log('Not found'))
    }
    getSearchData =({search})=> {
        this.setState({ loading: true })
        let url = `${`http://hn.algolia.com/api/v1/search`}`
        if (search) {
            url += `?query=${search}/`
        }
        axios.get(url)
            .then((response)=>{
                const {data} = response
                const {hits} = data
                this.setState({dataList: hits, p_id: hits[0].objectID})
            })
            .catch(errors => console.log('Not found'))
    }

    render(){
        const {postList, p_id, loading} = this.state
        console.log('search_text', p_id)
        return(
            <div className="container p-5">
                {loading &&
                <div className="d-flex justify-content-center form-box">
                    <div className="spinner-grow text-danger" role="status" style={{width:'60px', height:'60px'}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                }
                {/*<div className="row">*/}
                    {/*<div className="col-xl-6">*/}
                        {/*<div className="shadow p-3 mb-5 bg-body rounded">*/}
                            {/*<h2 className="text-center">Search Your Keyword</h2>*/}
                            {/*<div className="input-group mb-3 mt-4">*/}
                                {/*<input type="text" className="form-control" placeholder="Type keyword here..."*/}
                                       {/*aria-label="Recipient's username" aria-describedby="basic-addon2"*/}
                                {/*onChange={(e)=> {this.handleChange(e)}}*/}
                                       {/*onKeyDown={(e)=> {this.handleChange(e)}}*/}
                                {/*/>*/}
                                {/*<button className="btn btn-primary"*/}
                                        {/*onClick={() => {*/}
                                            {/*this.props.history.push({*/}
                                                {/*pathname: `${`/search-result`}/`,*/}
                                                {/*state: {post_id: p_id}*/}
                                            {/*})*/}
                                        {/*}}*/}
                                {/*>Search</button>*/}
                            {/*</div>*/}

                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="row">
                    <div className="col-xl-10 m-auto">
                        {postList.map((singalPost, i)=>{
                            const {id, userId, body, title} = singalPost
                            return(
                                <div className="card shadow mb-3" key={id} style={{cursor:'pointer'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{title.charAt(0).toUpperCase() + title.slice(1)}</h5>
                                        <p className="card-text">{body}</p>
                                        <a href="#" className="card-link">See Post</a>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchHome
