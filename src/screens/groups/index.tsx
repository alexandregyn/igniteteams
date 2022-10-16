import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight title='Tumas' subtitle='Jogue com a sua turma'/>
    </Container>
  );
}
