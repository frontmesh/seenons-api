import { Test, TestingModule } from '@nestjs/testing';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';

describe('ProviderController', () => {
  let controller: ProviderController;
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderController],
      providers: [ProviderService],
    }).compile();

    controller = module.get<ProviderController>(ProviderController);
    service = module.get<ProviderService>(ProviderService);
  });

  describe('findServices', () => {
    it('should return services', async () => {
      const postalCode = 12345;
      const weekdays = ['MONDAY', 'WEDNESDAY'];
      const mockResponse = [{ id: 1, name: 'Service 1' }, { id: 2, name: 'Service 2' }];
      jest.spyOn(service, 'findServices').mockResolvedValue(mockResponse);

      const result = await controller.findServices({ postalCode, weekdays });
      expect(result).toEqual(mockResponse);
      expect(service.findServices).toHaveBeenCalledWith(postalCode, weekdays);
    });

    it('should throw an error when postalCode is missing', async () => {
      const weekdays = ['MONDAY', 'WEDNESDAY'];
      await expect(controller.findServices({ weekdays })).rejects.toThrow();
    });

    it('should throw an error when postalCode is not a number', async () => {
      const postalCode = 'not a number';
      const weekdays = ['MONDAY', 'WEDNESDAY'];
      await expect(controller.findServices({ postalCode, weekdays })).rejects.toThrow();
    });
  });
});
