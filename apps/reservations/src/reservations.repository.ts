import { Injectable, Logger } from '@nestjs/common';
import { ReservationsDocument } from './models/reservation.schema';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument> {
  protected logger: Logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationsDocument.name)
    reservationModel: Model<ReservationsDocument>,
  ) {
    super(reservationModel);
  }
}
