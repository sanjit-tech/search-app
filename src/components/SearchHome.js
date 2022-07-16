import React, {Component, Fragment} from "react";
import './../App.css';
import axios from 'axios'

class SearchHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            search_text: '',
        }

    }
    handleChange = (e) => {
        const { value } = e.target
        if (e.key === 'Enter') {
            let url = `/search-result`
            url += `/${value}/`
            window.location.href = `${url}`
        }
        if (value.length > 3) {
            this.setState({search_text: value}, ()=>{
                this.getSearchData({ search: value })
            })

        }
    };

    getSearchData =({search})=> {
        this.setState({ loading: true })
        let url = `${`http://hn.algolia.com/api/v1/search`}`
        if (search) {
            url += `?query=${search}/`
        }
        axios.get(url)
            .then((response)=>{
                const {data} = response
                this.setState({dataList: data})
            })
            .catch(errors => console.log('Not found'))
    }

    render(){
        const {search_text} = this.state
        console.log('search_text', search_text)
        return(
            <div className="container p-5">
                <div className="row form-box">
                    <div className="col-xl-6">
                        <div className="shadow p-3 mb-5 bg-body rounded">
                            <h2 className="text-center">Search Home</h2>
                            <div className="input-group mb-3 mt-4">
                                <input type="text" className="form-control" placeholder="Type keyword here..."
                                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={(e)=> {this.handleChange(e)}}
                                />
                                <button className="btn btn-primary"
                                        onClick={() => {
                                            let e = {
                                                key: 'Enter',
                                                target: {
                                                    value: search_text
                                                }
                                            }
                                            this.handleChange(e)
                                        }}
                                >Search</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchHome
