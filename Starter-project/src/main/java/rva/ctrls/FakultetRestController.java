package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Departman;
import rva.jpa.Fakultet;
import rva.repository.FakultetRepository;

@RestController
public class FakultetRestController {
	
	@Autowired
	private FakultetRepository fakultetRepository;
	
	@GetMapping("Fakultet")
	public Collection<Fakultet> getFakulteti()
	{
		return fakultetRepository.findAll();
	}
	
	@GetMapping("Fakultet/{id}")
	public Fakultet getFakultet(@PathVariable("id")Integer id)
	{
		return fakultetRepository.getOne(id);
	}
	
	
	 @GetMapping("FakultetNaziv/{naziv}")
	public Collection<Fakultet> getFakultetByNaziv(@PathVariable("naziv")String naziv)
	{
		return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
	}
}
