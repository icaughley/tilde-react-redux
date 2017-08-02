import axios from  'axios';

// Replace the Axios verbs with jest mock functions.
axios.post = jest.fn((url) => {
    return Promise.resolve();
});
axios.get = jest.fn((url) => {
    return Promise.resolve();
});
axios.put = jest.fn((url) => {
    return Promise.resolve();
});
axios.delete = jest.fn((url) => {
    return Promise.resolve();
});
axios.reset = function(){
    this.post.mockClear();
    this.get.mockClear();
    this.put.mockClear();
    this.delete.mockClear();
};

export default axios;