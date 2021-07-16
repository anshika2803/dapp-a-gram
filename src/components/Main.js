import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto my-4">
              <div className="p-3 bg-secondary text-white d-flex flex-column justify-content-center" style={{'margin-top':"8rem"}}>
               <p>&nbsp;</p>
              <h2 className="justify-content-center ml-5">Upload Your Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
              }} >
                <input type='file' className="ml-5 mt-2 bg-dark" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control ml-5 bg-dark text-danger"
                        placeholder="Enter your Caption "
                        style={{ width: '350px' }}
                        required />
                  </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
              </div>
              <p>&nbsp;</p>
              { this.props.images.map((image, key) => {
                return(
                  <div className="card mb-4 " key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                        alt="post"
                      />
                      <small className="text-muted">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush bg-secondary bg-gradient">
                      <li className="list-group-item bg-secondary bg-gradient text-indigo-500 ">
                        <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>
                        <p className="text-indigo-500">{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }

  
}

export default Main;