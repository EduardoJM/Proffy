import request from 'supertest';
import app from './server';

describe('Test Proffy server', () => {
    it('should get classes route only with filters', (done) => {
        const testClassesGetWith = (subject?: string, week_day?: number, time?: string) => {
            const expectedStatus = (subject === undefined || week_day === undefined || time === undefined)
                ? 400
                : 200;
            request(app)
                .get('/classes')
                .query({ subject, week_day, time })
                .expect(expectedStatus)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    if (expectedStatus === 400) {
                        expect(res.body).toHaveProperty('error');
                    } else {
                    }
                    return done();
                });
        };
        // test without any filter
        testClassesGetWith();
        // test only with one filter
        testClassesGetWith('Matemática');
        testClassesGetWith(undefined, 1, undefined);
        testClassesGetWith(undefined, undefined, '08:00');
        // test only with to filters
        testClassesGetWith('Matemática', 1);
        testClassesGetWith(undefined, 1, '08:00');
        testClassesGetWith('Matemática', undefined, '08:00');
        // test with all filters
        testClassesGetWith('Matemática', 2, '08:00');
    });

    it('should get connections route', (done) => {
        request(app)
            .get('/connections')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toHaveProperty('total');
                return done();
            });
    });
});
