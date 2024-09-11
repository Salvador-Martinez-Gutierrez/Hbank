// 1. Loading... muy sencillo
// 2. Esqueleto completo -> Solo por un trozo no enseñamos todo
// 3. Streaming de HTML -> <Suspense fallback={<div>Cargando...</div>}> o Esqueleto con la forma del componente
// -> Fetching de datos a nivel de componente -> 1:22:00 Midudev Next 14

export default function Loading () {
  return <div className="h-[calc(100vh-200px)] px-4 lg:px-8 xl:px-16 pt-6 bg-neutral-900 text-neutral-200 ">Loading...</div>
}
