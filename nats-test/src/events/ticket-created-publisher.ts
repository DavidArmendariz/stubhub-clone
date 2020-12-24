import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from './ticket-creted-event';
import { Subjects } from './subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
