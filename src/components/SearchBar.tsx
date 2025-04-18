// src/components/SearchBar.tsx
interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  function SearchBar({ value, onChange }: SearchBarProps) {
    return (
      <input
        type="text"
        placeholder="Pesquisar por nome ou CPF/CNPJ"
        value={value}
        onChange={onChange}
        className="search-bar"
        aria-label="Pesquisar clientes"
      />
    );
  }
  
  export default SearchBar;