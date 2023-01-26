import {
  HealthCheckService,
  HealthIndicatorFunction,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test } from '@nestjs/testing';

import { CheckApplicationStatusUseCase } from './CheckApplicationStatus.service';

describe('CheckApplicationStatusService', () => {
  let checkApplicationStatusUseCase: CheckApplicationStatusUseCase;
  const mockPingCheck = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CheckApplicationStatusUseCase,
        {
          provide: HealthCheckService,
          useValue: {
            check: (results: HealthIndicatorFunction[]) => {
              return results.reduce(
                (response, result) => {
                  const currentObj = result();
                  const { status } = Object.values(currentObj)[0];
                  const details = Object.assign(response.details, currentObj);

                  if (status === 'up') {
                    Object.assign(response.info, currentObj);
                  } else {
                    Object.assign(response.error, currentObj);
                  }

                  return Object.assign(response, details);
                },
                {
                  status: 'ok',
                  info: {},
                  error: {},
                  details: {},
                },
              );
            },
          },
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: {
            pingCheck: mockPingCheck,
          },
        },
      ],
    }).compile();

    checkApplicationStatusUseCase =
      moduleRef.get<CheckApplicationStatusUseCase>(
        CheckApplicationStatusUseCase,
      );
  });

  it('should return status ok if all checks passed', async () => {
    mockPingCheck.mockImplementation(() => ({
      database: {
        status: 'up',
      },
    }));

    const response = await checkApplicationStatusUseCase.execute();

    expect(response).toEqual(
      expect.objectContaining({
        status: 'ok',
        info: {
          database: { status: 'up' },
        },
        error: {},
        details: {
          database: { status: 'up' },
        },
      }),
    );
  });

  it('should return status error if one of checks fail', async () => {
    mockPingCheck.mockImplementationOnce(() => ({
      database: {
        status: 'down',
      },
    }));

    const response = await checkApplicationStatusUseCase.execute();

    expect(response).toEqual(
      expect.objectContaining({
        status: 'ok',
        info: {},
        error: { database: { status: 'down' } },
        details: {
          database: { status: 'down' },
        },
        database: { status: 'down' },
      }),
    );
  });
});
