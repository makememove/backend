const { expect } = require('chai');
const { getEvents } = require('../middleware/events/index');

const mock = query => ({
    models: {
        sequelize: {
            Op: {
                in: 'in',
                or: 'or',
                like: 'like',
                gt: 'gt',
                lt: 'lt',
                between: 'btw'
            }
        },
        user: {},
        category: {},
        sport: {},
        event: {
            findAll(query) {
                expect(query).to.have.property('where');
                for (const key in query) {
                    expect(query).to.have.property(key);
                }
                return [{}];
            }
        }
    }
});

const req = {
    query: {
        sportId: '',
        closed: '',
        public: ''
    },
    user: { id: 'asd' }
};

const res = {
    locals: {
        user: { friends: [] }
    }
};

const next = err => {
    console.log(err);
};

describe('getEvents', () => {
    it('should consider query params', () => {
        getEvents(mock(req.query))(req, res, next);
    });
});
