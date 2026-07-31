import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { T } from "../theme";
import { findCountry } from "../data/countries";

export default function CountrySelect({ value, onChange, required, inputStyle }) {
  const listId = useId();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const options = useMemo(() => findCountry(query), [query]);

  useEffect(() => {
    if (!open) return;
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[highlight];
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  function select(country) {
    onChange(country);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }

  function onKeyDown(e) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && options[highlight]) {
      e.preventDefault();
      select(options[highlight]);
    }
  }

  return (
    <div ref={rootRef} className="df-country-select" style={{ position: "relative" }}>
      <input
        type="hidden"
        name="country"
        value={value?.name || ""}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        onChange={() => {}}
      />

      <div style={{ position: "relative" }}>
        {!open && value && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.05rem",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            {value.flag}
          </span>
        )}
        {open && (
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: T.muted,
              pointerEvents: "none",
            }}
          />
        )}
        <input
          ref={inputRef}
          className="df-input"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && options[highlight] ? `${listId}-${options[highlight].code}` : undefined}
          aria-label="Country"
          autoComplete="country-name"
          placeholder="Search country..."
          value={open ? query : value ? value.name : ""}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onKeyDown={onKeyDown}
          required={required && !value}
          style={{
            ...inputStyle,
            paddingLeft: open || value ? "2.35rem" : inputStyle.paddingLeft,
            paddingRight: "2.35rem",
            cursor: "text",
          }}
        />
        <ChevronDown
          size={16}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            color: T.muted,
            pointerEvents: "none",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          className="df-country-list"
          style={{
            position: "absolute",
            zIndex: 50,
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            margin: 0,
            padding: 6,
            listStyle: "none",
            maxHeight: 240,
            overflowY: "auto",
            borderRadius: 12,
            border: `1px solid rgba(0,212,255,0.14)`,
            background: "rgba(10,20,34,0.98)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          }}
        >
          {options.length === 0 ? (
            <li style={{ padding: "0.65rem 0.75rem", fontSize: "0.82rem", color: T.muted }}>
              No countries found
            </li>
          ) : (
            options.map((country, index) => {
              const active = index === highlight;
              const selected = value?.code === country.code;
              return (
                <li
                  key={country.code}
                  id={`${listId}-${country.code}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlight(index)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(country)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "0.6rem 0.75rem",
                    borderRadius: 8,
                    fontSize: "0.84rem",
                    color: selected ? T.cyan : T.text,
                    background: active ? "rgba(0,212,255,0.08)" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", lineHeight: 1, width: 22, textAlign: "center" }}>
                    {country.flag}
                  </span>
                  <span style={{ flex: 1 }}>{country.name}</span>
                  <span style={{ fontSize: "0.68rem", color: T.dim, letterSpacing: "0.04em" }}>
                    {country.code}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
