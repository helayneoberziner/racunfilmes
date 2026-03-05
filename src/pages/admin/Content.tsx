import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Construction } from 'lucide-react';

export default function Content() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Conteúdo do Site</h1>
          <p className="text-muted-foreground">
            Gerencie os textos e informações exibidos no site
          </p>
        </div>

        <Card className="border-gradient bg-card/50">
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground space-y-3">
              <Construction className="h-12 w-12 mx-auto opacity-50" />
              <h3 className="text-lg font-semibold text-foreground">Em desenvolvimento</h3>
              <p className="max-w-md mx-auto">
                Em breve você poderá editar os textos das seções do site diretamente por aqui, 
                como títulos, descrições, depoimentos e informações de contato.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
