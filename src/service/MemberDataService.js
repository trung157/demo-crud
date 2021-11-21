import http from '../http-common';

class MemberDataService {
  getAll() {
    return http.get('/members');
  }

  get(id) {
    return http.get(`/members/${id}`);
  }

  create(data) {
    return http.post('/members', data);
  }

  update(id, data) {
    return http.put(`/members/${id}`, data);
  }

  delete(id) {
    return http.delete(`/members/${id}`);
  }

  deleteAll() {
    return http.delete(`/members`);
  }

  findByFullName(fullName) {
    return http.get(`/members?fullName=${fullName}`);
  }
}

export default new MemberDataService();
